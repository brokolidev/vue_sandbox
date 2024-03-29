Vue.component('tabs', {
    data() {
        return {
            tabs: [],
        }
    },

    template: `
    <div class="box">
        <div class="tabs">
            <ul>
                <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
                    <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
                </li>
            </ul>
        </div>

        <div class="tabs-details">
            <slot></slot>
        </div>
    </div>
    `,

    created() {
        this.tabs = this.$children;
    },

    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
            });
        }
    }

})

Vue.component('tab', {
    data() {
        return {
            isActive: false
        }
    },

    props: {
        name: { required: true },
        selected: { default: false },
    },

    template: `
    <div class="contents" v-show="isActive">
        <p><slot></slot></p>
    </div>
    `,

    computed: {
        href() {
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        }
    },

    mounted() {
        this.isActive = this.selected;
    }
})


Vue.component('modal', {

    template: `
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">This is modal</div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
        </div>
    `,

});



Vue.component('message', {
    data() {
        return {
            isVisible: true,
        }
    },

    props: ['title', 'body'],

    template: `
        <article class="message" v-show=isVisible>
            <div class="message-header">
            <p>{{ title }}</p>
            <button class="delete" aria-label="delete" @click="isVisible = false"></button>
            </div>
            <div class="message-body">{{ body }}</div>
        </article>
    `,
    
});


Vue.component('task', {
    template: '<li><slot></slot></li>'
});

Vue.component('task-list', {
    template: `
        <ul>
            <task v-for="task in tasks">{{ task.task }}</task>
        </ul>    
    `,

    data() {
        return {
            tasks: [
                { task: 'Go to the store', complete: true },
                { task: 'Go to the bank', complete: false },
                { task: 'Go to the shop', complete: true },
                { task: 'Go to the carcenter', complete: true },
            ]
        }
    }
});


new Vue({
    el: '#root',

    data: {
        title: 'Add this name',
        newName: '',
        names: [ 'John', 'Sansa', 'Aria', 'Rob', 'Ned' ],
        showModal: false,
    },

    methods: {
        addName() {
            this.names.push(this.newName);
            this.newName = '';
        }, 
    }
});