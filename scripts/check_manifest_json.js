const fs = require('fs').promises;
const path = require('path');

const manifestPath = path.join(__dirname, 'public', 'manifest.json');

async function validateManifest() {
    try {
        const contents = await fs.readFile(manifestPath, 'utf8');
        
        try {
            JSON.parse(contents);
            console.log('Manifest is valid JSON.');
            return true;
        } catch (parseError) {
            console.error('Error: Invalid JSON in manifest file.');
            console.error('Parse error:', parseError.message);
            return false;
        }
    } catch (readError) {
        console.error('Error: Unable to read manifest file.');
        console.error('Read error:', readError.message);
        return false;
    }
}

validateManifest()
    .then(isValid => {
        if (!isValid) {
            process.exit(1);
        }
    })
    .catch(error => {
        console.error('Unexpected error:', error);
        process.exit(1);
    });
