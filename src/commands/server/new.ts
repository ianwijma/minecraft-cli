import { Command, flags } from "@oclif/command";
import { prompt } from "inquirer";
import ServerTypes from "../../enums/serverTypes";
import VanillaServerInstance from "../../instances/vanillaServerInstance";

export default class New extends Command {
  static args = [
    {
      name: "query",
      require: false,
      description: "The vanilla version or modpack search query",
      default: "",
    },
    {
      name: "path",
      require: false,
      description: "The path to install the server at",
      default: ".",
    },
  ];

  static description = "Creates new vanilla or modpack server";

  static examples = [];

  static flags = {
    vanilla: flags.boolean({
      char: "v",
      description: "Install a vanilla server",
      default: false,
      required: false,
      exclusive: ["modded"],
    }),
    modpack: flags.boolean({
      char: "m",
      default: false,
      required: false,
      description: "Install a modpack server",
      exclusive: ["vanilla"],
    }),
    threads: flags.integer({
      char: "t",
      default: 4,
      required: false,
      description: "The amount of download threads you want to use",
    }),
    snapshot: flags.boolean({
      char: "s",
      default: false,
      required: false,
      description: "Shows vanilla's snapshots in the results",
    }),
    old: flags.boolean({
      char: "o",
      default: false,
      required: false,
      description: "Shows vanilla's old releases in the results",
    }),
  };

  async run() {
    const { args, flags } = this.parse(New);
    const { query, path } = args;
    let { vanilla, modpack, threads, snapshot, old } = flags;

    if (!vanilla && !modpack) [vanilla, modpack] = await this.chooseType();

    if (vanilla) this.installVanilla(path, query, threads, snapshot, old);
    if (modpack) this.installModpack(path, query, threads);
  }

  async installVanilla(
    path: string,
    query: string,
    threads: number,
    snapshot: boolean,
    old: boolean
  ) {
    const instance = new VanillaServerInstance(path);
    instance.setDownloadThreads(threads);
    if (snapshot) instance.enableSnapshots();
    if (old) instance.enableOldReleases();
    await instance.new(query);
  }

  async installModpack(path: string, query: string, threads: number) {}

  async chooseType(): Promise<boolean[]> {
    const { chosenType } = await prompt([
      {
        name: "chosenType",
        type: "list",
        message: "Which type of server do you want to install?",
        default: "vanilla",
        choices: [
          {
            name: "Vanilla",
            value: ServerTypes.vanilla,
          },
          {
            name: "Modpack",
            value: ServerTypes.modpack,
          },
        ],
      },
    ]);

    return [
      chosenType === ServerTypes.vanilla,
      chosenType === ServerTypes.modpack,
    ];
  }
}
