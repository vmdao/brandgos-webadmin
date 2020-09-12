import HistoryManager from './utils/HistoryManager';
import Debugger from './utils/Debugger';
import EventBus from './utils/EventBus';
import Memory from './utils/Memory';
import KeyManager from './utils/KeyManager';
import ClipboardManager from './utils/ClipboardManager';
import MoveableData from './viewport/MoveableData';

export class Editor {
  public historyManager = new HistoryManager(this);
  public console = new Debugger(this.prams.debug);
  public eventBus = new EventBus();
  public memory = new Memory();
  public moveableData = new MoveableData(this.memory);
  public keyManager = new KeyManager(this.console);
  public clipboardManager = new ClipboardManager(this);

  constructor(private prams) {}
}
