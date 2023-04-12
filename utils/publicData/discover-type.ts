interface PhotoType {
	id: Number,
	type: String,
	value: String
}

export const discoverType:PhotoType[] = [
		{
			id: 1,
			type: 'Home',
			value: 'home'
		},
		{
			id: 2,
			type: 'Foreign',
			value: 'foreign'
		}
	]