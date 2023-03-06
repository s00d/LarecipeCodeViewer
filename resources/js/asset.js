import CodeSimples from './CodeSimples';
import CodeRequester from './CodeRequester';

LaRecipe.booting((Vue) => {
    Vue.component(CodeSimples.name, CodeSimples);
    Vue.component(CodeRequester.name, CodeRequester);
})
