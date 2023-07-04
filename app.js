$(document).ready(() => {
	// Necessary DOM elements
	const startDateInput = document.getElementById('start-date-input') 
	const endDateInput = document.getElementById('end-date-input')
	const getPictureButton = document.getElementById('get-picture-button')
	const apodContainer = document.getElementById('apod-container')

	getPictureButton.addEventListener('click', () => {
		const startDate = startDateInput.value
		const endDate = endDateInput.value

		if ((startDate && endDate)) {
			const apiUrl = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=x08vnXUHjX2NaAXS57IarEdY0fEuNvFR5f4JrOT2`

			fetch(apiUrl)
				.then((res) => res.json())
					.then((res) => {
						console.log(res)
						// add css attributes in here
						apodContainer.innerHTML= ''

						res.forEach((obj) => {
							if (obj.media_type === 'video') {
								const apodVideo = document.createElement('iframe')
								apodVideo.src = obj.url
								apodVideo.width = '960'
								apodVideo.height = '600'
							
								apodVideo.classList.add('apod-video');
								apodContainer.appendChild(apodVideo)
							} else {
								const apodImage = document.createElement('img')
								apodImage.src = obj.url
								apodImage.alt = 'Astronomy Picture of the Day'

								apodImage.classList.add('apod-image')
								apodContainer.appendChild(apodImage)

							}
							const apodExplanation = document.createElement('paragraph')
							apodExplanation.textContent = obj.explanation
							apodContainer.appendChild(apodExplanation)

							
						})
				})
				.catch((err) => {
					console.error('Error:', err)
				})
		}
	})
})
