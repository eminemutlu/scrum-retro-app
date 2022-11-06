import { createStore } from 'vuex'

export default createStore({

  state: {
		category: [
            { id: 1, title: 'Good', type: 'success' },
            { id: 2, title: 'Bad', type: 'danger' },
            { id: 3, title: 'Action', type: 'primary' },
            { id: 4, title: 'Ideas', type: 'info' }
        ],
		cards: [
            {
                id: 1,
                category_id: 1,
                text: 'API finally pushed to prod',
                action: 'GET',
                weight:0
            },
            {
                id: 2,
                category_id: 1,
                text: 'Designer on board',
                action: 'GET',
                weight:0
            },
            {
                id: 3,
                category_id: 2,
                text: 'Wait too long for team to respond to Slack',
                action: 'GET',
                weight:0
            },
            {
                id: 4,
                category_id: 2,
                text: 'Sprint goal unclear',
                action: 'GET',
                weight:0
            },
            {
                id: 5,
                category_id: 2,
                text: 'Too much tickets waiting for PO review',
                action: 'GET',
                weight:0
            },
            {
                id: 6,
                category_id: 3,
                text: 'Plan daily huddle at 11:00 AM',
                action: 'GET',
                weight:0
            },
            {
                id: 7,
                category_id: 4,
                text: 'Invite stakeholders to demos more often?',
                action: 'GET',
                weight:0
            },
            
        ],
        cardVoties: [
            {
                card_id : 1,
                category_id: 1,
                userId: '1000'
            },
            {
                card_id : 1,
                category_id: 1,
                userId: '2000'
            },
            {
                card_id : 1,
                category_id: 1,
                userId: '3000'
            },
            {
                card_id : 3,
                category_id: 2,
                userId: '4000'
            }
        ],
	},
    getters: {
        //getter category object
        category: state => {
            return state.category;
        },
        //getter cards object
        cards: state => {
            state.cards.map(function(obj) { 
                obj.weight = 0; 
                return obj
            });
            state.cardVoties.forEach(element => {
                state.cards.forEach((object, index) => {
                    if(object.id === element.card_id) {
                        state.cards[index].weight = (state.cards[index].weight + 1);
                    }
                });
            });
            return state.cards;
        },
        //geter vote object
        cardVoties: state => {
            return state.cardVoties;
        },
        
    },
    mutations: {
        //setCards mutation for creating a new card
        setCards(state, posts) {
            const maxId = (Math.max(...state.cards.map(value => value.id))) + 1;

            state.cards.push({
                id : maxId,
                category_id : posts,
                text: "",
                action: "PUT",
                weight: 0

            });
        },
        //removeCard mutation for removing
        removeCard(state, posts) {
            const indexOfObject = state.cards.findIndex(object => {
                return object.id === posts;
            });
            state.cards.splice(indexOfObject, 1);
            //removing vote object depend on deleted card's id
            const voteObj = state.cardVoties.filter(function( obj ) {
                return obj.card_id !== posts;
            });
            state.cardVoties = voteObj;
        },
        //setText mutation for updating text of card
        setText(state, posts) {
            if(posts.id) {
                const index = state.cards.findIndex(object => {
                    return object.id === posts.id;
                }); 
                if (index !== -1) {
                    state.cards[index].text = posts.text;
                    state.cards[index].action = posts.action;
                }
            }
        },
        //setVote mutation for adding and removing dot voting of card
        setVote(state, posts) {
            if(posts.status !== true) {
                const idxObj = state.cardVoties.findIndex(object => {
                    return object.userId === posts.userId && object.card_id === posts.data.id && object.category_id === posts.data.category_id;
                });
                if(idxObj === -1) {
                    return false;
                } else {
                    state.cardVoties.splice(idxObj, 1);
                }
            } else {
                const itemCounter = (array: Array<any|number>, id: number) => {
                    return array.filter((currentItem) => currentItem.category_id == id &&  currentItem.userId == posts.userId).length;
                };
                const count = itemCounter(state.cardVoties, posts.data.category_id);
                if(count >= 2) {
                    alert("You can only 2 voties per scrum category!");
                    return false;
                } else {
                    state.cardVoties.push({
                        card_id : posts.data.id,
                        category_id: posts.data.category_id,
                        userId: posts.userId
    
                    });
                }
            }
        }
    },
    actions: {
        addCard(context, payload) {
            if(payload){
                context.commit('setCards', payload)
            }
        },
        removeCard(context, payload) {
            if(payload){
                context.commit('removeCard', payload)
            }
        },
        saveText(context, payload) {
            if(payload){
                context.commit('setText', payload)
            }
        },
        saveVote(context, payload) {
            if(payload){
                context.commit('setVote', payload)
            }
        },
        
    }

})
