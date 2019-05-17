module.exports = api => {
	api.cache(true);

	return {
		presets: ['module:metro-react-native-babel-preset'],
		plugins: [
			[
				'babel-plugin-relative-path-import',
				{
					paths: [
						{
							rootPathPrefix: '@res',
							rootPathSuffix: 'src/res'
						},
						{
							rootPathPrefix: '@Images',
							rootPathSuffix: 'src/res/Images'
						},
						{
							rootPathPrefix: '@Components',
							rootPathSuffix: 'src/UI/Components'
						},
						{
							rootPathPrefix: '@Networking',
							rootPathSuffix: 'src/Networking'
						},
						{
							rootPathPrefix: '@Utils',
							rootPathSuffix: 'src/Utils'
						},
						{
							rootPathPrefix: '@Screens',
							rootPathSuffix: 'src/UI/Screens'
						},
						{
							rootPathPrefix: '@Core',
							rootPathSuffix: 'src/Core'
						},
						{
							rootPathPrefix: '@Navigations',
							rootPathSuffix: 'src/Navigations'
						},
						{
							rootPathPrefix: '@Menu',
							rootPathSuffix: 'src/Menu'
						},

						{
							rootPathPrefix: '@Redux',
							rootPathSuffix: 'src/Redux'
						}
					]
				}
			]
		]
	};
};
