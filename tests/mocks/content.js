const blogMocks = {}

blogMocks.postContentWithImage = `
While there are many tools in the ecosystem, here are some common unit testing tools that are being used in the Vue.js ecosystem.
Jest
Resources:
    <a href="http://google.com">Official google Website</a>
    <a href="https://popovskiy.com">Official Popovskiy Website</a>
    <a href="ftp://yahoo.com">Official Yahoo ftp</a>
    <a href="popovsky.pro">Official Popovsky.pro</a>
Mocha

no styled image
<img src='/media/cc0-images/image1.jpg'
     alt='Grapefruit slice atop a pile of other slices'>

with double quotes
<img alt="Grapefruit slice atop a pile of other slices"
src="/media/cc0-images/image2.png">

styled image
     <img class="fit-picture"
     src="/media/cc0-images/image3.jpg"
     alt="Grapefruit slice atop a pile of other slices">

multiline
<img class="fit-picture"
     data-selctor="asdasd"
     alt="Grapefruit slice atop a pile of other slices"
     src="/media/cc0-images/image4.jpg"
     >
image in base64
     <img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
     AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
          9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
Mocha is a JavaScript test framework that is focused on being flexible. Because of this flexibility, it allows you to choose different libraries to fulfill other common features such as spying (e.g., Sinon) and assertions (e.g., Chai). Another unique feature of Mocha is that it can also execute tests in the browser in addition to Node.js.
`;

blogMocks.postContentWithImageBase64 = `image in base64 <img src="data:image/png;base64,VBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />`;
blogMocks.postContentWithoutImageBase64 = `image in base64 <img src='/route/image.jpg' alt='Red dot' />`;
export default blogMocks