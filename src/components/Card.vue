<template>
    <div class="card position-relative" :class="setColor(cardColor)">
        <div class="card-body">
            <p v-if="!datasource.text || datasource.action == 'PUT'" class="card-text">
                <textarea 
                    v-model="comment" 
                    placeholder="Write text" 
                    class="form-control mt-3 mb-2" 
                    rows="3"
                    >
                </textarea>
                <button 
                    type="button" 
                    class="btn btn-light"
                    @click="saveText(datasource.id, 1)"
                    >
                    Save
                </button>
            </p>
            <p v-else class="card-text" @click="saveText(datasource.id, 2)">
                {{ datasource.text }}
                <font-awesome-icon icon="pencil" />
            </p>
            <span 
                class="position-absolute closeStyle"
                @click="removeCard(datasource.id)"
                >
                <font-awesome-icon icon="close"/>
            </span>
            <span> 
                <div v-if="datasource.text">
                    <font-awesome-icon icon="star" @click="clickVote(datasource, true)"/>
                    <ul>
                        <li 
                            v-for="(item, key) in getVoties(datasource.id)" 
                            :key="key"
                            @click="clickVote(datasource, false)"
                            >
                        </li>
                    </ul>
                </div>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, ref } from 'vue';
    import { useStore } from "vuex";

    export default defineComponent({
        name: 'DashbordView',
        props: {
            data:  {
                type: Object,
                required: true,
            },
            color: {
                type: String,
                required: true,
            }
        },

        setup(props) {

            const store = useStore();
            // eslint-disable-next-line vue/no-setup-props-destructure
            const cardColor = props.color;
            const comment = ref(props.data.text);

            const datasource: any = computed(() => {
                return props.data;
            });
            
            const setColor = ((e: any) => {
                return `bg-${e}`;
            });

            const removeCard = (id: number) => {
                store.dispatch("removeCard", id);
            }
            
            const saveText = (id: number, action: number) => {
                const payload = {
                    id: id,
                    text: comment.value,
                    action: (action === 2) ? 'PUT' : 'GET'
                }
                store.dispatch("saveText", payload);
            }

            const getVoties = ((id: number) => {
                return store.getters.cardVoties.filter((value: any) => value.card_id === id);
            });

            const clickVote = (datasource: object, status: boolean) => {
                const userId = window.localStorage.getItem("userId");
                const payload = {
                    data: datasource,
                    userId: userId,
                    status: status
                }
                store.dispatch("saveVote", payload);
            } 
            
            return { 
                datasource,
                cardColor,
                setColor,
                removeCard,
                comment,
                saveText,
                getVoties,
                clickVote
            };
        }
    });
    
</script>

<style lang="scss">

    .card {
        width: 18rem;
        margin: 0 auto;
        margin-top: 30px !important;
        margin-bottom: 10px !important;
        min-height: 100px;
        p.card-text{
            cursor: pointer;
        }
        span{
            color: white;
        }
        span>div:last-child {
                display: flex;
                justify-content: flex-start;
                :nth-child(1){
                    font-size: 20px;
                    cursor: pointer;
                    // margin-right: 10px;
                }
                ul {
                    padding: 0;
                    margin: 3px 0px 0px 8px;
                    display: flex;
                    li {
                        border-radius: 50%;
                        width: 15px;
                        height: 15px;
                        background: #ccc;
                        list-style-type: none;
                        padding: 0;
                        margin: 0px 0px 0px 5px;
                        cursor: pointer;
                    }
                    li:hover {
                        background: #842029 !important;
                    }
            }
                    
            }
        .closeStyle {
            top: -22px;
            right: -18px;
            font-size: 1.8rem;
            padding: 3px;
            cursor: pointer;
            border-radius: 50%;
            width: 40px;
            background: white;
            height: 40px;
            color: darkgray;
            }
    }
    .card-text {
        color: white;
    }

</style>
