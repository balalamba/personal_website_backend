import { findImageLinks, parseImagesFromString } from '../../modules/parseImages';
import blogMocks from '../mocks/content';

jest.mock('../../modules/fs.js');

import fsModule from '../../modules/fs.js';

describe('parseImages Module',() => {
    test('Find image links', () => {
        const expectation = 
        [
            '/media/cc0-images/image1.jpg',
            '/media/cc0-images/image2.png',
            '/media/cc0-images/image3.jpg',
            '/media/cc0-images/image4.jpg',
        ];
        const result = findImageLinks(blogMocks.postContentWithImage);
        expect(result).toStrictEqual(expectation)
    })
    test('Find image base64',async () => {
        
        fsModule.decode_base64 = async () => Promise.resolve('/route/image.jpg');
        const result = await parseImagesFromString({
            slug:"ohota",
            content: blogMocks.postContentWithImageBase64,
            locale:"fr",
        });
        expect(result).toStrictEqual({
            slug:"ohota",
            locale:"fr",
            content:"image in base64 <img src='/route/image.jpg' alt='Red dot' />"
        })
    })
    test('Find 0 image base64',async () => {
        
        fsModule.decode_base64 = async () => Promise.resolve('/route/image.jpg');
        const result = await parseImagesFromString({
            slug:"ohota",
            content: blogMocks.postContentWithoutImageBase64,
            locale:"fr",
        });
        expect(result).toStrictEqual({
            slug:"ohota",
            locale:"fr",
            content:"image in base64 <img src='/route/image.jpg' alt='Red dot' />"
        })
    })
})