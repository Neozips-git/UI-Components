document.addEventListener('click', () => { 
    const dropdown = event.target.closest('.dropdown')
	const dropdownAll = document.querySelectorAll('.dropdown')
    
	dropdownAll.forEach((elem) => {
		if(elem == dropdown) {
			if(elem.classList.contains('keep-open') || event.target.closest('.keep-open')) {
                elem.classList.add('open')
            }else{
                elem.classList.toggle('open')
            }
		}else{
			elem.classList.remove('open')
		}
    })
}, false)