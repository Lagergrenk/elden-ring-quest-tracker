const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');

console.log(`Processing JSON files in: ${dataDir}\n`);

// Get all JSON files in the data directory
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

if (files.length === 0) {
  console.log('No JSON files found!');
  process.exit(1);
}

console.log(`Found ${files.length} JSON file(s):\n`);

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  
  try {
    // Read the JSON file
    let content = fs.readFileSync(filePath, 'utf-8');
    let data = JSON.parse(content);
    
    let tagCount = 0;

    // Recursively convert all string tags to arrays
    function convertTags(obj) {
      if (Array.isArray(obj)) {
        obj.forEach(item => convertTags(item));
      } else if (obj !== null && typeof obj === 'object') {
        Object.keys(obj).forEach(key => {
          if (key === 'tag' && typeof obj[key] === 'string') {
            obj[key] = [obj[key]];
            tagCount++;
          } else {
            convertTags(obj[key]);
          }
        });
      }
    }
    
    convertTags(data);
    
    // Write back with formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    console.log(`✓ ${file} - Converted ${tagCount} tag(s) to array format`);
  } catch (error) {
    console.error(`✗ ${file} - Error: ${error.message}`);
  }
});

console.log('\n✓ All tags converted to arrays!');