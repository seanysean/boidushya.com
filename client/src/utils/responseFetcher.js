import commands from "./commands.json";
import styled from "styled-components";
import theme from "../styles/theme";

// eslint-disable-next-line
const Wrapper = styled.span`
	a{
		color:inherit;
		background:inherit;
		text-decoration:none;
	}
	.style1{
		color: ${theme.bodyFont1};
	}
	.style2{
		color: ${theme.bodyFont2};
	}
	.style3{
		color: ${theme.bodyFont2.darken(0.5)};
		background: ${theme.bodyFont1};
	}
`

const getErrorCommand = (command) => {
	return (
		<Wrapper>
			zsh: command not found: <span className="style2">{command}</span>
		</Wrapper>
	)
}

const parseResponse = (command,{data}) => {
	let response = command.response
	return (
		<Wrapper
			dangerouslySetInnerHTML={{
				__html:response.replace(/%arg%/g,`<span class="style2">${data}</span>`)
			}}
		/>
	)
}

const getResponse = (data) => {
	let commandWithArgs = data.split(" ")
	if(commands.hasOwnProperty(commandWithArgs[0])){
		let arg = ""
		let originalArg = ""
		if(commandWithArgs.length===1){
			arg = "_dir"
		}
		else if(commands[commandWithArgs[0]].validArgs.hasOwnProperty(commandWithArgs[1])){
			arg = commandWithArgs[1]
		}
		else{
			arg = "default"
		}
		originalArg = arg
		if(arg==="default"){
			originalArg = commandWithArgs[1]
		}
		return parseResponse(commands[commandWithArgs[0]].validArgs[arg],{data:originalArg})
	}
	else{
		return getErrorCommand(data)
	}
}

export default getResponse