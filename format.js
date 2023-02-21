String.prototype.name = (first_name, last_name) => {

    const f_name = (first_name == 'undefined' || !first_name) ? '' : first_name
    const l_name = (last_name == 'undefined' || !last_name) ? '' : last_name
    
    const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
    if(check.test(f_name) || check.test(l_name)) {
        return l_name + f_name
    }else{
        return f_name + ' ' + l_name
    }
}
String.prototype.date = (txt) => {
    const d = new Date(txt.replace('T', ' ').split(/-|,/))
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    })
}

String.prototype.datetime = (txt) => {
    const d = new Date(txt)
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute:'2-digit',
    })
}

String.prototype.numValid = (event) => {
    if(event.key === '-' || event.key === '+') event.preventDefault()
}

String.prototype.address = (obj) => {
    let address = ''
    if(obj.address_line_1) address += obj.address_line_1
    if(obj.address_line_2) address += ' ' + obj.address_line_2
    if(obj.city) address += ', ' + obj.city
    if(obj.state) address += ', ' + obj.state
    if(obj.zip) address += ' ' + obj.zip
    return address
}