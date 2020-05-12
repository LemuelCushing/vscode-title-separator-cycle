# Title Separator Cycle - VSCode extension

A super useful addition to you workbelt! Using the brand spankin' shiny [new feature of VSCode 1.45](https://code.visualstudio.com/updates/v1_45#_custom-window-title-separator) (April 2020): `window.titleSeparator` (Dankeschön [muuvmuuv](https://github.com/microsoft/vscode/pull/94371)!)

The reviewers are ecstatic:

> "eh?"

> "Wow. really?"

> "You'll just do anything to delay your actual work, eh?"

> "Do you still sell ritalin? I've an exam coming up"

## Details

See those terrible dashes between the file name and the workspace name on the title bar? (If you kept the default settings, I mean) The gods have smiled on us and allowed us to change them, thanks to the important initiative of a brave few. Blessed be microsoft, giver of community driven tools, who ask nothing in return but huge profits. Amen.

Uh, anyway this extension changes that separator to a random/cycled one from a list of cool and edgy unicode & emoji, currently stored in a separate  (`characters.json`)[https://github.com/LemuelCushing/vscode-title-separator-cycle/blob/master/src/characters.json] file. This fact might change, because it's probably a stupid way to do it.

The location of the separators is set by the native VSCode Window: Title (`window.title`) setting

## Commands

#### Toggle change upon startup
Command: `toggleChange` <br>
Toggles run on startup
#### Change separator (Random)
Command: `changeSeparatorRandom`<br>
Even though the extension is called cycle, it randomizes by default, because random is magic!
>What will it be next? Run bets with your friends! Could this become a terrible drinking game? Perhaps!
#### Change separator (Cycle)
Command: `changeSeparatorCycle`<br>
Cycles over the character list one by one (Even jumps to the start of the array! The thrill!)
#### Choose separator from list
Command: `chooseSeparator`<br>
Manually select a separator from the list of available chars

## Options

### Run on startup `.runOnStartup`
Toggles run on startup (Default: `true`)

### Mode `.mode`
Either `cycle` or `random` on startup (Default: `random`)


