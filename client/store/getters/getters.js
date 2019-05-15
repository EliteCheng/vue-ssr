
//类似于vue里头的computed

export default {
	fullName(state){
		return `${state.firstName} ${state.lastName}`;
	}
}
