const visit = require('unist-util-visit');

const plugin = (options) => {
  const transformer = async (ast) => {
    visit(ast, 'jsx', (node) => {
        if (node.value.includes("www.youtube.com/watch")) {
            // console.log(node.value);
            let array1;
            let rx = /<object data="https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9-_]{11}">\s*<p \/>\s*<\/object>/i;            
            array1 = rx.exec(node.value);
            // console.log(array1);

            for (i = 0; i < array1.length; i++ ) {
                let YouTubeID = array1[i].substring(46, 57);
                // console.log(YouTubeID);
                // console.log(array1[i]);

                const iframe = `
                  <iframe 
                    class="embed-responsive-item" 
                    src="https://www.youtube.com/embed/${YouTubeID}" 
                    width="560" 
                    height="315" 
                    frameborder="0" 
                    allowfullscreen="">
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