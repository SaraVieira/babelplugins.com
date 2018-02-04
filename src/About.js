import React from 'react'
import RawSearchBox from './RawSearch';
import { Hits, Configure, InstantSearch } from 'react-instantsearch/dom'
import { connectSearchBox } from 'react-instantsearch/connectors'

const config = {
	apiKey: '1f0cc4b7da241f62651b85531d788fbd',
	appId: 'OFCNCOG2CU',
	indexName: 'npm-search',
}

class About extends React.Component {
	render() {
		const SearchBox = connectSearchBox(RawSearchBox)

		function hitComponent({ hit }) {
			return (
				<label key={hit.name}>
					{hit.name}
				</label>
			)
		}
		return (
			<div className="page">
				<InstantSearch
					apiKey={config.apiKey}
					appId={config.appId}
					indexName={config.indexName}
				>
					<Configure
						// hitsPerPage={10}
						attributesToRetrieve={['name', 'version']}
						attributesToHighlight={['name']}
						filters={
							'keywords:babel-plugin'
							// (showOfficialExternalPlugins ? ' AND owner.name:babel' : '')
						}
					/>

					<label>
						<div>
							<label>
								<input
									//checked={showOfficialExternalPlugins}
									// onChange={e => {
									// 	_onshowOfficialExternalPluginsChanged(e.target.value)
									// }}
									type="checkbox"
								/>
								Only official Plugins
							</label>

							<SearchBox />
							<Hits hitComponent={hitComponent} />
						</div>
						{/* {pluginsLoading ? (
							<PresetLoadingAnimation />
						) : (
							<div>
								{hasPlugins && !plugins.length
									? 'There are no plugins that match your query'
									: null}
							</div>
						)} */}
					</label>
				</InstantSearch>
			</div>
		)
	}
}

export default About
