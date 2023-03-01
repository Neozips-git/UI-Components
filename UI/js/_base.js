import _ from 'lodash'
import './Date.js'
import './Dropdown.js'
import './Format.js'
import '../scss/_bass.scss'


export default {
	install(app) {
		const sourceFiles = import.meta.globEager([
				'@/components/UI/element/*.vue',
				'@/components/UI/element/source/*.vue',
				'@/components/UI/element/Grid/*.vue',
		])

		Object.entries(sourceFiles).forEach(([path, m]) => {
			const componentName = _.upperFirst(
				_.camelCase(path.split('/').pop().replace(/\.\w+$/, ''))
			)

			app.component(
				`${componentName}`, m.default
			)
		})
	},
}
