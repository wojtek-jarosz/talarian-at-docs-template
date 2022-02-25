const visit = require('unist-util-visit');

const plugin = (options) => {
  const transformer = async (ast) => {
    visit(ast, 'jsx', (node) => {
        if (node.value.includes("www.youtube.com/watch")) {
            const objectStart = node.value.indexOf("<object");
            // console.log(objectStart);
            const objectEnd = node.value.indexOf("</object>") + 9;
            // console.log(objectEnd);
            const objSubstr = node.value.substring(objectStart, objectEnd);
            // console.log(objSubstr);
            const youtubeIdStart = objSubstr.indexOf("watch") + 8;
            const youtubeIdEnd = objSubstr.indexOf('">');
            const youtubeID = objSubstr.substring(youtubeIdStart, youtubeIdEnd);
            // console.log(youtubeID);

            const iframe = `
            <iframe 
              class="embed-responsive-item" 
              src="https://www.youtube.com/embed/${youtubeID}" 
              width="560" 
              height="315" 
              frameborder="0" 
              allowfullscreen="">
            </iframe>
            `;
            // console.log(objSubstr);
            // console.log(iframe);
            node.value = node.value.replace(objSubstr, iframe);
            // console.log(node.value);
        }
    });
  };
  return transformer;
}

module.exports = plugin;