import { useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';

let isLanguageRegistered = false;
let isThemeRegistered = false;

const SkriptEditor = ({ editorRef }) => {
  const monaco = useMonaco();
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (monaco) {
      if (!isLanguageRegistered) {
        // Define the Skript language
        monaco.languages.register({ id: 'skript' });

        // Define the syntax highlighting
        monaco.languages.setMonarchTokensProvider('skript', {
          tokenizer: {
            root: [
              // Commands and Triggers
              [
                /\b(command|on|trigger|options|aliases|usage|description|permission|cooldown|return)\b/,
                'keyword',
              ],

              // Functions
              [/\b(function)\b/, 'keyword'],

              // Conditional Statements
              [/\b(if|else if|else)\b/, 'keyword'],

              // Stopwords
              [/\b(stop|cancel event|exit loop|exit|end|quit)\b/, 'stopword'],

              // Loops and Iterators
              [
                /\b(loop-number-\d+|loop-index-\d+|loop-value-\d+|loop-number|loop-index|loop-value)\b/,
                'variable',
              ],
              [/\b(loop|while|times|repeat|every)\b/, 'keyword'],

              // Operations and Actions
              [
                /\b(set|delete|remove|add|clear|reset|apply|send|message|broadcast|play|drop|wait|give|open)\b/,
                'keyword',
              ],

              // Events
              [/\b(event-[^\s]+)\b/, 'type'],

              // Variables
              [/%[^\n%]*%/, 'variable'],
              [/\{(?!\{)[^\{\}]*\}/, 'variable'], // Matches variables inside single braces
              [/\{([^{}]|\{([^{}]|\{[^{}]*\})*\})*\}/, 'variable'], // Matches variables inside nested braces
              [/\barg-\d+\b/, 'variable'], // Matches arg variables

              // Data Types and Values
              [/\b(true|false|null)\b/, 'constant'],
              [/-?\b\d+(\.\d+)?%?/, 'number'],
              [/\"([^\\\"]|\\.)*\"/, 'string'],

              // Comments
              [/#.*/, 'comment'],

              // Braces and Operators
              [/{|}/, 'skript-delimiter'],
              [/\(|\)/, 'skript-delimiter'],
              [/\[|\]/, 'skript-delimiter'],
              [/<|>/, 'skript-delimiter'],

              // Entities and Actors
              [
                /\b(player|entity|victim|attacker|npc|monster|animal|projectile|location|itemtype|world|inventory|block|item|text|list)'?s?\b/,
                'type',
              ],

              // Expressions
              [/\b(is|are|has|equal|not|and|or)\b/, 'keyword'],
            ],
          },
        });

        // Define auto completion
        monaco.languages.registerCompletionItemProvider('skript', {
          provideCompletionItems: () => {
            const suggestions = [
              {
                label: 'command',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'command /${1:command_name}:\n    trigger:\n        ${2:# Your code here}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Define a command',
              },
              {
                label: 'trigger',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'trigger:\n    ${1:# Your code here}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Define a trigger',
              },
              {
                label: 'on',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'on ${1:event_name}:\n    ${2:# Your code here}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Define an event',
              },
              {
                label: 'function',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText:
                  'function ${1:function_name}(${2:parameter_name}: ${3:parameter_type}):\n    ${4:# Your code here}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Define a function',
              },
              {
                label: 'if',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'if ${1:condition}:\n    ${2:# Your code here}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Conditional statement',
              },
              {
                label: 'else',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'else:\n    ${1:# Your code here}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Else statement',
              },
              {
                label: 'while',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'while ${1:condition}:\n    ${2:# Your code here}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'While loop',
              },
              {
                label: 'for',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'for ${1:item} in ${2:collection}:\n    ${3:# Your code here}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'For loop',
              },
              {
                label: 'return',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'return ${1:value}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Return statement',
              },
              {
                label: 'loop',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'loop ${1:times} times:\n    ${2:# Your code here}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Loop statement',
              },
              {
                label: 'stop',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'stop',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Stop statement',
              },
              {
                label: 'wait',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'wait ${1:time}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Wait statement',
              },
              {
                label: 'player',
                kind: monaco.languages.CompletionItemKind.TypeParameter,
                insertText: 'player',
                documentation: 'Player type',
              },
              {
                label: 'entity',
                kind: monaco.languages.CompletionItemKind.TypeParameter,
                insertText: 'entity',
                documentation: 'Entity type',
              },
              {
                label: 'block',
                kind: monaco.languages.CompletionItemKind.TypeParameter,
                insertText: 'block',
                documentation: 'Block type',
              },
              {
                label: 'item',
                kind: monaco.languages.CompletionItemKind.TypeParameter,
                insertText: 'item',
                documentation: 'Item type',
              },
              {
                label: 'event',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'event',
                documentation: 'Event keyword',
              },
              {
                label: 'location',
                kind: monaco.languages.CompletionItemKind.TypeParameter,
                insertText: 'location',
                documentation: 'Location type',
              },
              {
                label: 'world',
                kind: monaco.languages.CompletionItemKind.TypeParameter,
                insertText: 'world',
                documentation: 'World type',
              },
              {
                label: 'inventory',
                kind: monaco.languages.CompletionItemKind.TypeParameter,
                insertText: 'inventory',
                documentation: 'Inventory type',
              },
              {
                label: 'every',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'every ${1:interval}:\n    ${2:# Your code here}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Repeat statement',
              },
              {
                label: 'set',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'set ${1:variable} to ${2:value}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Set variable statement',
              },
              {
                label: 'add',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'add ${1:value} to ${2:variable}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Add value to variable statement',
              },
              {
                label: 'remove',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'remove ${1:value} from ${2:variable}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Remove value from variable statement',
              },
              {
                label: 'delete',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'delete ${1:variable}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Delete variable statement',
              },
              {
                label: 'clear',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'clear ${1:variable}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Clear variable statement',
              },
              {
                label: 'broadcast',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'broadcast "${1:message}"',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Broadcast message statement',
              },
              {
                label: 'message',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'message ${1:player} with "${2:message}"',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Message player statement',
              },
              {
                label: 'send',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'send "${1:message}" to ${2:player}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: 'Send message to player statement',
              },
              {
                label: 'right click',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'right click',
                documentation: 'Right click keyword',
              },
              {
                label: 'left click',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'left click',
                documentation: 'Left click keyword',
              },
              {
                label: 'command',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'command',
                documentation: 'Command keyword',
              },
              {
                label: 'trigger',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'trigger',
                documentation: 'Trigger keyword',
              },
              {
                label: 'function',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'function',
                documentation: 'Function keyword',
              },
              {
                label: 'on',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'on',
                documentation: 'On keyword',
              },
            ];
            return { suggestions };
          },
        });

        isLanguageRegistered = true;
      }

      if (!isThemeRegistered) {
        monaco.editor.defineTheme('skriptTheme', {
          base: 'vs-dark',
          inherit: true,
          rules: [
            { token: 'keyword', foreground: 'C586C0' },
            { token: 'type', foreground: '4EC9B0' },
            { token: 'constant', foreground: '569CD6' },
            { token: 'number', foreground: 'B5CEA8' },
            { token: 'string', foreground: 'D69D85' },
            { token: 'comment', foreground: '6A9955' },
            { token: 'variable', foreground: '9CDCFE' },
            { token: 'skript-delimiter', foreground: 'A855F7' },
            { token: 'stopword', foreground: 'FF5555' },
          ],
          colors: {
            'editor.background': '#1E1E1E',
          },
        });

        // Set the custom theme
        monaco.editor.setTheme('skriptTheme');

        isThemeRegistered = true;
      }
    }
  }, [monaco]);

  return (
    <Editor
      height='93vh'
      defaultLanguage='skript'
      defaultValue={`command /example:\n    trigger:\n        # Your code here`}
      theme='skriptTheme'
      onMount={handleEditorDidMount}
    />
  );
};

export default SkriptEditor;
