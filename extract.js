const fs = require('fs');
const path = 'C:/Users/sukim/.gemini/antigravity/brain/32ff7b90-bdb0-44c7-be37-a5c34755652f/.system_generated/steps/12/output.txt';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

function getText(node) {
    if (node.type === 'TEXT') {
        console.log(`[TEXT] ${node.characters.replace(/\n/g, '\\n')}`);
    } else if (node.type === 'IMAGE' || (node.fills && node.fills.some(f => f.type === 'IMAGE'))) {
        console.log(`[IMAGE] id: ${node.id}, name: ${node.name}`);
    }
    
    if (node.children) {
        node.children.forEach(getText);
    }
}

getText(data.nodes['172:182'].document);
