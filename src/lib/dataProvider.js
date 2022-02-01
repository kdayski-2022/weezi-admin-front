import customJsonServerProvider from './customJsonServerProvider';
const dataProvider = customJsonServerProvider(process.env.REACT_APP_APIURL);
const imageFields = ['image','imageWide']
const myDataProvider = {
	...dataProvider,
	update: (resource, params) => {
		let hasImages = false
		let images = []
		imageFields.forEach(imageField => {
			if(Object.keys(params.data).indexOf(imageField)!==-1 && params.data[imageField] !== null ){
				if (params.data[imageField].hasOwnProperty('rawFile')) {
					if (typeof params.data[imageField] === 'object') {
						hasImages = true
						params.data[imageField].field = imageField
						params.data[imageField].newName = Math.random().toString(36).substr(2, 30)
						images.push(params.data[imageField])
					}
				}	
			}
		})
		if (hasImages){
			let promiseConvert = []
			images.forEach(image => {
				if(image.rawFile instanceof File){
					promiseConvert.push(convertFileToBase64(image))
				}
			});
			return Promise.all(promiseConvert).then((convertedImages)=>{
				dataProvider.update(resource, {
					...params,
					data: {
						...params.data,
						images: [
							...convertedImages
						]
					}
				})
			}
			)

			// // })
			// // newPictures = images.filter(
			// // 	p => p.rawFile instanceof File
			// // )
			// // formerPictures = images.filter(
			// // 	p => !(p.rawFile instanceof File)
			// // )
			
			// return Promise.all(newPictures.map(convertFileToBase64))
			// 	.then(base64Pictures =>
			// 		base64Pictures.map(picture64 => ({
			// 			src: picture64,
			// 			title: Math.random().toString(36).substr(2, 30)
			// 		}))
			// 	)
			// 	.then(transformedNewPictures => {

			// 		dataProvider.update(resource, {
			// 			...params,
			// 			data: {
			// 				...params.data,
			// 				images: [
			// 					...transformedNewPictures,
			// 					...formerPictures,
			// 				],
			// 			},
			// 		})
			// 	}
			// );
		} else {
			return dataProvider.update(resource, params);
		}

	},
};

const convertFileToBase64 = file =>
	new Promise((resolve, reject) => {
		console.log('convertFileToBase64')
		console.log(file)
		const reader = new FileReader();
		
		reader.onload = () => {
			file.base64 = reader.result
			resolve(file)
		};
		reader.onerror = reject;

		reader.readAsDataURL(file.rawFile);
	});

export default myDataProvider;