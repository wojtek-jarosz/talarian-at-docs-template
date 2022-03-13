const visit = require('unist-util-visit');

const plugin = (options) => {
  const transformer = async (ast) => {
    visit(ast, 'jsx', (node) => {
        if (node.value.includes('type="AwesomeTable"')) {
            // console.log(node.value);
            let array1;
            let rx = /<object xmlns="http:\/\/www\.w3\.org\/1999\/xhtml" data="[a-zA-Z0-9\-\_]{20}" type="AwesomeTable\"> <\/object>/i;
            array1 = rx.exec(node.value);
            for (i = 0; i < array1.length; i++ ) {
                let AwesomeTableID = array1[i].substring(51, 71);
                // console.log(AwesomeTableID);
                // console.log(array1[i]);

                const iframe = `
                    <iframe 
                        referrerpolicy="no-referrer-when-downgrade" 
                        height="600px" 
                        width="100%" 
                        style={{border: "none",}} 
                        src="https://view-awesome-table.com/${AwesomeTableID}/view">
                    </iframe>
                `;
                node.value = node.value.replace(array1[i], iframe);
                // console.log(node.value);
            }
        }
    });
  };
  return transformer;
}

module.exports = plugin;