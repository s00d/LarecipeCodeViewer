import CodeViewerComponent from './CodeViewerComponent';
import CodeBlockComponent from './CodeBlockComponent';
import SnippetsSelectorComponent from './SnippetsSelectorComponent';

LaRecipe.booting((Vue) => {
    Vue.component(CodeViewerComponent.name, CodeViewerComponent);
    Vue.component(CodeBlockComponent.name, CodeBlockComponent);
    Vue.component(SnippetsSelectorComponent.name, SnippetsSelectorComponent);
})
