```js
const type = (target, type) => { ... };

const ViewModelListener = class { ... }
const ViewModel = class extends ViewModelListener { ... }
const ViewModelValue = class { ... }            

const BinderItem = class { ... }
const Binder = class extends ViewModelListener { ... }
const Processor = class { ... }
const Scanner = class { ... }

const scanner = new Scanner();
const binder = scanner.scan(document.querySelector('#target'));
binder.addProcessor(new class extends Processor { ... }
binder.addProcessor(new class extends Processor { ... }
binder.addProcessor(new class extends Processor { ... }
binder.addProcessor(new class extends Processor { ... }


const getRandom = () => parseInt(Math.random() * 150) + 100;
const wrapper = ViewModel.get({
    styles: { width: '50%', background: '#ffa', cursor: 'pointer' },
    events: {
        click(e, vm) {
            vm.parent.isStop = true
        }
    }
});
const title = ViewModel.get({ properties: { innerHTML: 'Title' } })
const contents = ViewModel.get({ properties: { innerHTML: 'Contents' } })
const rootViewModel = ViewModel.get({
    isStop: false,
    changeContents() {
        this.wrapper.styles.background = `rgb(${getRandom()},${getRandom()},${getRandom()})`
        this.contents.properties.innerHTML = Math.random().toString(16).replace('.', '')
    },
    wrapper, title, contents
});
//POINT7
// debugger;
binder.watch(rootViewModel);
const f = () => {
    //POINT8
    // debugger;
    rootViewModel.changeContents();
    if (!rootViewModel.isStop) requestAnimationFrame(f);
};
requestAnimationFrame(f);

```


1. ViewModel > Object.entries(obj).reduce((r, [k, v]) => (r[k] = ViewModel.descriptor(vm, category, k, v), r), {})

   * reduce구문에 대한 이해 완료 

   * reduce( callback( accumulator, cur[, idx, src]) [, initValue])

     ```js
     (r, [k, v]) => (r[k] = ViewModel.desriptor(vm,category, k, v), r)
     
     === 
     (r, [k, v]) => {
         r[k] = ViewModel.dscriptor(vm,category, k, v)
         return r
     }
     
     
     ```

3. ViewModel Class => #isUpdated = new Set; #listeners = new Set;



2. subkey? 



* Binder class > render method

  ```js
  render(viewmodel, _ = type(viewmodel, ViewModel)) {
      //변경: this.#processors변경에 의한 변경
      //POINT4
      // # this.#processors: Binder inst.addProcessor의해서 생성
      // # this.#items: Scan Class에서 호출 BinderItem inst
      const processores = Object.entries(this.#processors);
  	this.#items.forEach(({ vmName, el }) => {
  		const vm = type(viewmodel[vmName], ViewModel);
      	processores.forEach(([pk, processor]) => {
          	Object.entries(vm[pk]).forEach(([k, v]) => {
              	processor.process(vm, el, k, v);
          })
      })
  })
  }
  ```

  ```js
  
  var arr = [{a: 1}, {a: 2}]
  arr.forEach((v, i) => v["b"] = i);
  
  var arr = [{a: 1, b: 0}, {a: 2, b: 1}];
  
  ```

  

* rootViewModel.changeContents();

  ```js
  
  
  const rootViewModel = ViewModel.get({
      isStop: false,
      changeContents() {
          this.wrapper.styles.background = `rgb(${getRandom()},${getRandom()},${getRandom()})`
          this.contents.properties.innerHTML = Math.random().toString(16).replace('.', '')
      },
      wrapper,
      title,
      contents
  });
  ```

  

  

  





# 값들 

```js
/*
    this.#procesors = { 
        styles: { category: "styles"},
        attribute: {category: "attributes"},
        properties: {category: "properties"},
        events: {category: "events"}
    }
*/
this.#processors[v.category] = v;
```

