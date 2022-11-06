<template>
    <header>
        <div>
            <!-- Category buttons -->
            <button  
                v-for="(item, index) in CategoryDatasource" :key="index" 
                type="button" 
                :class="btnStatus(item.type)" 
                class="btn"
                @click="addCard(item.id)"
                >
                {{ item.title }}
            </button>
        </div>
        <!-- User Info -->
        <div>
            <h2>Scrum Sprint Retro</h2>
            <h6>Welcome user: {{userId}}</h6>
        </div>
    </header>
    <main id="main">
        <article v-for="(item, index) in CategoryDatasource" :key="index">
            <h3>{{item.title}}</h3>
            <Card 
                v-for="data in getCard(item.id)" 
                :key="data.id" 
                :data="data" 
                :color="item.type"
                class="mt-3"
                >
            </Card>
        </article>  
    </main>
</template>

<script lang="ts">
    import { defineComponent, computed, ref } from 'vue';
    import { useStore } from "vuex";
    import Card from '@/components/Card.vue';


    export default defineComponent({
        name: 'DashbordView',
        components: { Card },

        setup() {

            const store = useStore();
            const userId = ref(window.localStorage.getItem("userId"));
            const CategoryDatasource: any = computed(() => {
                return store.getters.category;
            });

            const btnStatus = ((e: any) => {
                return `btn-${e}`;
            });
            const getCard = ((id: number) => {
                const data = store.getters.cards.filter((value: any) => value.category_id === id);
                const result = data.sort((a: any, b: any) => b.weight - a.weight);
                return result;
            })

            const addCard = (id: number) => {
                store.dispatch("addCard", id);
            }

            return { 
                CategoryDatasource,
                btnStatus,
                getCard,
                addCard,
                userId
            };
        }
    });
    
</script>

<style lang="scss">
    header {
        display: flex;
        justify-content: space-between;

        div {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;

            button {
            padding: 10px;
            text-decoration: none;
            }

            .btn + .btn {
                margin-left: 5%;
            }
        }
        div:nth-child(2) {
            display: inline-block;
        }
    }
    header, footer, section {
        padding: 1em;
        height: 12vh;
    }
    #main {
        display: flex;
        min-height: calc(100vh - 40vh);
        align-items: stretch;
        flex-wrap: wrap;
        article {
            flex-grow: 1;
            min-height: 100%;
            border: 1px solid #ccc;
            box-shadow: 2px 2px 6px 0px  rgba(0,0,0,0.3);
            margin: 10px;
            padding: 20px;
            h3 {
                border-bottom: solid 1px #ccc;
                padding-bottom: 10px
            }
        }
    }
</style>