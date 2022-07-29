import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { Ob3gvView, VIEW_TYPE_OB3GV } from "./view";

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class Ob3dgvPlugin extends Plugin {
	async onload() {
	  this.registerView(
		VIEW_TYPE_OB3GV,
		(leaf) => new Ob3gvView(leaf)
	  );
  
	  this.addRibbonIcon("dice", "Activate view", () => {
		this.activateView();
	  });
	}
  
	async onunload() {
	  this.app.workspace.detachLeavesOfType(VIEW_TYPE_OB3GV);
	}
  
	async activateView() {
	  this.app.workspace.detachLeavesOfType(VIEW_TYPE_OB3GV);
  
	  await this.app.workspace.getLeaf(false).setViewState({
		type: VIEW_TYPE_OB3GV,
		active: true,
	  });
  
	  this.app.workspace.revealLeaf(
		this.app.workspace.getLeavesOfType(VIEW_TYPE_OB3GV)[0]
	  );
	}
  }