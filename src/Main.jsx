import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import "./main.css"
import {Container, Signin, Signup, Home, Search, Overview, Manager, Join, Room, Landing, Courses} from './pages'
import * as Dashboard from "./comps/Private"
import { Protect } from "./service/Protect"
import Design from "./pages/Design.tsx"
import About from "./pages/About"
import Test from "./hooks/Test";


function Main() {

	return <BrowserRouter>

		<div>
			<Switch>

				<Route path="/signin">
					<Signin />
				</Route>

				<Route path="/signup">
					<Signup />
				</Route>

				<Protect exact path="/home">
					<Container>
						<Home />
					</Container>
				</Protect>

				<Protect path="/manage/create">
					<Container>
						
					</Container>
				</Protect>

				<Protect path="/courses">
					<Container>
						<Courses/>
					</Container>
				</Protect>


				<Protect path="/search=:keyword">
					<Container>
						<Search />
					</Container>
				</Protect>

				<Protect path="/view=:id">
					<Container>
						<Overview />
					</Container>
				</Protect>

				<Protect path="/manage/:id">
					<Container>
						<Manager />
					</Container>
				</Protect>
				<Route path="/example">
					<Test />
				</Route>
				<Route exact path="/join/:course" component={Join} />
				<Route exact path="/room/:course" component={Room} />

				<Route path="/test">
					<Design />
				</Route>
				
				<Route path="/about">
					<About />
				</Route>

				<Route exact path="/">
					<Landing />
				</Route>
				
			</Switch>
		</div>

	</BrowserRouter>
}

export default Main;
