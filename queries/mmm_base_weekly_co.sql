-- MMM base weekly for Habi Colombia - Google Meridian
DECLARE start_date DATE DEFAULT DATE('2024-01-01');
DECLARE end_date   DATE DEFAULT DATE('2025-09-01');

WITH 
-- Calendar weeks (Mon-Sun)
calendar AS (
  SELECT
    week_start,
    DATE_ADD(week_start, INTERVAL 6 DAY) AS week_end,
    FORMAT_DATE('%G-W%V', week_start) AS iso_week
  FROM UNNEST(GENERATE_DATE_ARRAY(start_date, end_date, INTERVAL 7 DAY)) AS week_start
),

-- Outcome: closures (ventas) per week
outcome_weekly AS (
  SELECT
    DATE_TRUNC(CAST(g.fecha_cierre AS DATE), WEEK(MONDAY)) AS week_start,
    COUNT(*) AS y_cierres
  FROM `papyrus-data.habi_wh_bi.tabla_inmuebles_general` AS g
  WHERE g.estado = 'CERRADO'
    AND CAST(g.fecha_cierre AS DATE) BETWEEN start_date AND end_date
  GROUP BY 1
),

-- Leads calificados por semana (solo canales de performance marketing)
leads_weekly AS (
  SELECT
    DATE_TRUNC(CAST(g.fecha_creacion AS DATE), WEEK(MONDAY)) AS g_semana_creacion,
    COUNT(*) AS y_leads_calificados
  FROM `papyrus-data.habi_wh_bi.tabla_inmuebles_general` AS g
  LEFT JOIN `sellers-main-prod.bi_co.registro_unico_utm_mkt_colombia` AS m ON g.campana_mercadeo = m.campana_mercadeo_original
  WHERE
    CAST(g.fecha_creacion AS DATE) > DATE '2024-01-01'
    AND g.fecha_a_pricing IS NOT NULL
    AND DATE_DIFF(g.fecha_a_pricing, g.fecha_creacion, DAY) BETWEEN 0 AND 14
    AND CASE 
          WHEN g.campana_mercadeo IS NULL OR g.campana_mercadeo = '' THEN CONCAT(g.fuente, ' Direct')
          WHEN m.mkt_channel_medium IS NULL OR m.mkt_channel_medium = '' THEN g.campana_mercadeo
          ELSE m.mkt_channel_medium
        END IN ('Estudio Inmueble Direct', 'Estudio Inmueble Paid','lead_forms Paid','WEB Direct','WEB Paid')
  GROUP BY 1
),

-- Inversión por canales (todos los canales de la base de datos)
inversion_weekly AS (
  SELECT
    CAST(DATE_TRUNC(i.date, WEEK(MONDAY)) as DATE) AS week_start,
    m.mkt_channel_small AS m_mkt_channel_small,
    SUM(i.spend) AS i_spend,
    SUM(i.clicks) AS i_clicks,
    SUM(i.impressions) AS i_impressions
  FROM `papyrus-data.habi_wh_bi.resumen_inversiones_mkt_co` AS i
  LEFT JOIN `sellers-main-prod.bi_co.registro_unico_utm_mkt_colombia` AS m ON i.campana = m.mkt_campaign_name
  WHERE i.date >= '2024-01-01'
  GROUP BY 1, 2
),

-- Controls: seasonality proxies
controls_weekly AS (
  SELECT
    c.week_start,
    EXTRACT(MONTH FROM c.week_start) AS month,
    EXTRACT(QUARTER FROM c.week_start) AS quarter,
    IF(EXTRACT(WEEK FROM c.week_start) IN (51,52,1), 1, 0) AS x_peak_year_end
  FROM calendar c
)

-- Resultado final: una fila por semana y canal
SELECT
  c.week_start AS date,
  COALESCE(ow.y_cierres, 0) AS y,
  COALESCE(lw.y_leads_calificados, 0) AS y_leads_calificados,
  COALESCE(iw.m_mkt_channel_small, 'No Investment') AS m_mkt_channel_small,
  COALESCE(iw.i_spend, 0) AS i_spend,
  COALESCE(iw.i_clicks, 0) AS i_clicks,
  COALESCE(iw.i_impressions, 0) AS i_impressions,
  cw.month,
  cw.quarter,
  cw.x_peak_year_end
FROM calendar c
LEFT JOIN outcome_weekly ow ON ow.week_start = c.week_start
LEFT JOIN leads_weekly lw ON lw.g_semana_creacion = c.week_start
LEFT JOIN inversion_weekly iw ON iw.week_start = c.week_start
LEFT JOIN controls_weekly cw ON cw.week_start = c.week_start
WHERE c.week_start BETWEEN start_date AND end_date
ORDER BY date, m_mkt_channel_small;