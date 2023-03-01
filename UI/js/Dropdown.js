document.addEventListener('click', () => { 
    const dropdown = event.target.closest('.dropdown')
	const dropdownAll = document.querySelectorAll('.dropdown')
    
	dropdownAll.forEach((elem) => {
		if(elem == dropdown) {
			if(elem.classList.contains('keep-open') || event.target.closest('.keep-open')) {
				if(!elem.classList.contains('open')) {
					elem.classList.add('open')
					autoFocus(elem)
				}
            }else{
                elem.classList.toggle('open')
				autoFocus(elem)
            }
		}else{
			elem.classList.remove('open')
		}
    })

	function autoFocus(elem) {
		setTimeout(() => {
			if(elem.classList.contains('open')) {
				if(elem.querySelector('input[type=text]')) elem.querySelector('input[type=text]').focus()
			}
		}, 100)
	}
}, false)