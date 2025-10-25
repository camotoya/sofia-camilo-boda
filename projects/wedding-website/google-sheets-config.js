// Google Sheets Integration Configuration
// This file contains the setup for connecting forms to Google Sheets

// Google Sheets API Configuration
    const GOOGLE_SHEETS_CONFIG = {
        API_KEY: process.env.AIzaSyDCAOpSEp3WWrLI6YBGR8nnPI6xCd19unE,
        SPREADSHEET_ID: process.env.1i-SwN4uBnQhwWXGP0D0p6GPByd7dY0IG_hth0xH51q4,
        SHEETS: {
            RSVP: 'RSVP_Responses',
            GIFTS: 'Gift_Contributions'
        }
    },
    
    // Column mappings for RSVP form
    RSVP_COLUMNS: {
        A: 'Timestamp',
        B: 'Name',
        C: 'Email',
        D: 'Phone',
        E: 'Attending',
        F: 'Menu_Choice',
        G: 'Transport_Requested',
        H: 'Song_Suggestion',
        I: 'Message'
    },
    
    // Column mappings for Gift contributions
    GIFT_COLUMNS: {
        A: 'Timestamp',
        B: 'Contributor_Name',
        C: 'Contributor_Email',
        D: 'Gift_Type',
        E: 'Amount',
        F: 'Message'
    }
};

// Function to submit RSVP data to Google Sheets
async function submitRSVPToSheets(formData) {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/values/${GOOGLE_SHEETS_CONFIG.SHEETS.RSVP}:append?valueInputOption=RAW&key=${GOOGLE_SHEETS_CONFIG.API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                values: [[
                    new Date().toISOString(),
                    formData.name,
                    formData.email,
                    formData.phone,
                    formData.attending,
                    formData.menu || '',
                    formData.transport || 'No',
                    formData.song || '',
                    formData.message || ''
                ]]
            })
        });
        
        if (response.ok) {
            console.log('RSVP data submitted successfully');
            return true;
        } else {
            console.error('Error submitting RSVP data:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error submitting RSVP data:', error);
        return false;
    }
}

// Function to submit gift contribution to Google Sheets
async function submitGiftToSheets(contributionData, giftType) {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/values/${GOOGLE_SHEETS_CONFIG.SHEETS.GIFTS}:append?valueInputOption=RAW&key=${GOOGLE_SHEETS_CONFIG.API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                values: [[
                    new Date().toISOString(),
                    contributionData.contributorName,
                    contributionData.contributorEmail,
                    giftType,
                    contributionData.contributionAmount,
                    contributionData.contributionMessage || ''
                ]]
            })
        });
        
        if (response.ok) {
            console.log('Gift contribution submitted successfully');
            return true;
        } else {
            console.error('Error submitting gift contribution:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error submitting gift contribution:', error);
        return false;
    }
}

// Function to get gift progress from Google Sheets
async function getGiftProgress() {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_CONFIG.SPREADSHEET_ID}/values/${GOOGLE_SHEETS_CONFIG.SHEETS.GIFTS}?key=${GOOGLE_SHEETS_CONFIG.API_KEY}`);
        
        if (response.ok) {
            const data = await response.json();
            return processGiftData(data.values);
        } else {
            console.error('Error fetching gift data:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error fetching gift data:', error);
        return null;
    }
}

// Process gift data to calculate progress
function processGiftData(rawData) {
    if (!rawData || rawData.length < 2) return {};
    
    const giftTotals = {};
    const giftTargets = {
        'Luna de Miel': 5000000,
        'Muebles para el Hogar': 5000000,
        'Vajilla Completa': 1000000,
        'Ropa de Cama': 500000,
        'Electrodomésticos': 5000000,
        'Fondo para Auto': 20000000,
        'Equipo de Ejercicio': 1000000,
        'Biblioteca': 500000,
        'Fondo General': 5000000
    };
    
    // Skip header row
    for (let i = 1; i < rawData.length; i++) {
        const row = rawData[i];
        const giftType = row[3]; // Column D
        const amount = parseInt(row[4]) || 0; // Column E
        
        if (giftTotals[giftType]) {
            giftTotals[giftType] += amount;
        } else {
            giftTotals[giftType] = amount;
        }
    }
    
    // Calculate progress percentages
    const progress = {};
    Object.keys(giftTotals).forEach(giftType => {
        const total = giftTotals[giftType];
        const target = giftTargets[giftType] || 1000000;
        progress[giftType] = {
            current: total,
            target: target,
            percentage: Math.min((total / target) * 100, 100)
        };
    });
    
    return progress;
}

// Update progress bars with real data
async function updateProgressBarsWithData() {
    const progressData = await getGiftProgress();
    if (!progressData) return;
    
    Object.keys(progressData).forEach(giftType => {
        const data = progressData[giftType];
        const progressBar = document.querySelector(`[data-gift="${giftType}"] .progress-fill`);
        const currentAmount = document.querySelector(`[data-gift="${giftType}"] .current-amount`);
        const targetAmount = document.querySelector(`[data-gift="${giftType}"] .target-amount`);
        
        if (progressBar) {
            progressBar.style.width = data.percentage + '%';
            progressBar.setAttribute('data-progress', data.percentage);
        }
        
        if (currentAmount) {
            currentAmount.textContent = `$${data.current.toLocaleString()}`;
        }
        
        if (targetAmount) {
            targetAmount.textContent = `de $${data.target.toLocaleString()}`;
        }
    });
}

// Setup instructions for Google Sheets integration
const SETUP_INSTRUCTIONS = `
GOOGLE SHEETS INTEGRATION SETUP:

1. Create a Google Sheets document with two sheets:
   - Sheet 1: "RSVP_Responses" 
   - Sheet 2: "Gift_Contributions"

2. Set up the RSVP_Responses sheet with these columns:
   A: Timestamp
   B: Name
   C: Email
   D: Phone
   E: Attending
   F: Menu_Choice
   G: Transport_Requested
   H: Song_Suggestion
   I: Message

3. Set up the Gift_Contributions sheet with these columns:
   A: Timestamp
   B: Contributor_Name
   C: Contributor_Email
   D: Gift_Type
   E: Amount
   F: Message

4. Enable Google Sheets API:
   - Go to Google Cloud Console
   - Create a new project or select existing
   - Enable Google Sheets API
   - Create credentials (API Key)
   - Copy the API key and spreadsheet ID to this config file

5. Make sure to replace the placeholder values in GOOGLE_SHEETS_CONFIG with your actual values.

6. Update the script.js file to use these functions instead of the simulated responses.

7. For production, make sure to:
   - Restrict your API key to your domain
   - Set up proper error handling
   - Monitor usage to avoid unexpected charges
`;

console.log(SETUP_INSTRUCTIONS);

// Export functions for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        submitRSVPToSheets,
        submitGiftToSheets,
        getGiftProgress,
        updateProgressBarsWithData,
        GOOGLE_SHEETS_CONFIG
    };
}


