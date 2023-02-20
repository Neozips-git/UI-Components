String.prototype.name = (first_name, last_name) => {

    if(typeof first_name == 'undefined' || !typeof last_name == 'undefined' ) return ''
    const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
    if(check.test(first_name) || check.test(last_name)) {
        return last_name + first_name
    }else{
        return first_name + ' ' + last_name
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