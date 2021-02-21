import axios from "axios";
import { createHash } from "crypto";
import { writeFile } from "fs-extra";

export interface Download {
  url: string;
  target: string;
  sha1?: string;
  size?: number;
}

export interface DownloadData {
  url: string;
  target: string;
  id?: string; // falls back to url
  sha1?: string;
  size?: number;
}

export default class Downloader {
  // We are using key > value to prevent double downloading of items
  private downloads: { [key: string]: Download } = {};

  addDownload({ id, url, target, sha1, size }: DownloadData) {
    id = id ?? url;
    this.downloads[id] = { url, target, sha1, size };
  }

  addDownloads(downloads: DownloadData[]) {
    downloads.forEach((download) => this.addDownload(download));
  }

  private downloadThreads: number = 4;

  setDownloadThreads(downloadThreads: number) {
    this.downloadThreads = downloadThreads;
  }

  constructor(downloads?: DownloadData[] | DownloadData) {
    if (downloads) {
      if ("indexOf" in downloads) {
        this.addDownloads(downloads);
      } else {
        this.addDownloads([downloads]);
      }
    }
  }

  async run() {
    for (let downloadChunks of this.getDownloadChunks()) {
      await this.downloadChunk(downloadChunks);
    }
  }

  private getDownloadChunks() {
    const keys = Object.keys(this.downloads);

    return keys.reduce(
      (results: DownloadData[][], key: string, index: number) => {
        const download = this.downloads[key];

        const chunkIndex = Math.floor(index / this.downloadThreads);
        if (!results[chunkIndex]) {
          results[chunkIndex] = []; // start a new chunk
        }

        results[chunkIndex].push(download);

        return results;
      },
      []
    );
  }

  private async downloadChunk(downloadChunk: DownloadData[]) {
    await Promise.all(
      downloadChunk.map(async (downloadData) => {
        const { id, url, target, sha1, size } = downloadData;
        const { data } = await axios(url, { responseType: "blob" });

        // if (size && size !== data.length) {
        //   throw new Error(
        //     `Got invalid size, expected (${size}), got (${data.length}): ${url}`
        //   );
        // }

        // if (sha1) {
        //   const expectedSha1 = createHash("sha1").update(data).digest("hex");
        //   if (sha1 !== expectedSha1) {
        //     throw new Error(
        //       `Got invalid sha1, expected (${sha1}), got (${expectedSha1}): ${url}`
        //     );
        //   }
        // }

        await writeFile(target, data);
      })
    );
  }
}
