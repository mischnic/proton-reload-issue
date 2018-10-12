// @proton-hot-disable
import React, { Component } from "react";
import { App, Window, render, Box, Text, Button } from "proton-native";

class MyApp extends Component {
	constructor(props){
		super(props);
		this.state = {text: "t"};
	}

	render(){
		return <App>
			<Window>
				<Box>
					<Text>
						{this.state.text}
					</Text>
					<Button onClick={()=>this.setState({text: this.state.text+"!!!"})}>
						Do!
					</Button>
				</Box>
			</Window>
		</App>;
	}
}

// when this file is hot reloaded, it gets executed again

let e;
class Wrapper extends Component {
	constructor(props){
		super(props);
		this.state = {component: MyApp};
		e = this;
	}

	render(){
		const X = this.state.component;
		return <X/>;
	}
}

if (module.hot.data && module.hot.data.proxy) {
	// we are running an update
	module.hot.data.proxy.setState({component: MyApp});
} else {
	// first run
	render(<Wrapper/>);
}

// Please reload me
module.hot.accept();
// Make proxy available in updated module
module.hot.dispose(data => {
	data.proxy = e || (module.hot.data && module.hot.data.proxy);
});

