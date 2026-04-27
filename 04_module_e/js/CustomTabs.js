class CustomTabs extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <style>
                *{
                    margin: 0;
                    padding: 0;
                }
                .tab-container{
                    margin: 2em;
                }
                .tab-group{
                    border: 1px solid #ccc;
                    display: flex;
                    justify-content: space-between;
                }
                ::slotted(.tab){
                    float: left;
                    border: none;
                    cursor: pointer;
                    padding: 1em 2em;
                    flex: 1;
                }
                ::slotted(.tab:hover),
                ::slotted(.tab.active){
                    background-color: #c2c1c1;
                }
                ::slotted(.tab-content){
                    display: none;
                    padding: 3em;
                    border: 1px solid #ccc;
                    border-top: none;
                    
                }
                ::slotted(.tab-content.active){
                    display: block
            
                
                }

                
            </style>
            <div class="tab-container">
                <div class="tab-group">
                    <slot name="tab"></slot>
                </div>
                <slot name="content"></slot>
            </div>
        `;

        this.tabs = this.shadowRoot
            .querySelector('slot[name="tab"]')
            .assignedElements();

        this.contents = this.shadowRoot
            .querySelector('slot[name="content"]')
            .assignedElements();

        this.tabs.forEach((tab, index) => {
            tab.classList.add("tab");
            tab.setAttribute("role", "tab");
            tab.setAttribute("aria-selected", "false");
            tab.setAttribute("tabindex", "0");


            tab.addEventListener("click", () => {
                this.setActiveTab(index);
            });
            tab.addEventListener("keydown", (e) => {
                
                
                if(e.key === "ArrowRight")
                {
                 
                    const nextIndex = (index + 1) % this.tabs.length;
                    this.setActiveTab(nextIndex);
                    this.tabs[nextIndex].focus();
                }
                if(e.key === "ArrowLeft")
                {
                    const prevIndex = (index - 1 + this.tabs.length) % this.tabs.length;
                    this.setActiveTab(prevIndex);
                    this.tabs[prevIndex].focus();
                }
            });
        });

        this.contents.forEach(content => {
            content.classList.add("tab-content");
            content.setAttribute("role","tabpanel");
            content.setAttribute("aria-hidden", "true");
        });

        if (this.tabs.length > 0) this.setActiveTab(0);
    }

    setActiveTab(index) {
       this.tabs.forEach(tab => {     
            tab.classList.remove("active");
            tab.setAttribute("aria-selected", "false");

       });


        this.contents.forEach(content => { 
            content.classList.remove("active");
            content.setAttribute("aria-hidden", "true");
        });

        this.tabs[index].classList.add('active');
        this.tabs[index].setAttribute("aria-selected", "true");

        this.contents[index].classList.add('active');
        this.contents[index].setAttribute("aria-hidden", "false");
    }

}

customElements.define('custom-tabs', CustomTabs);