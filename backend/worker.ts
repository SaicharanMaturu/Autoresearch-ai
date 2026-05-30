import { FileModel } from './db';

let workerRunning = false;

export async function enqueueFileProcessing(fileId: string) {
  try {
    await FileModel.updateOne({ id: fileId }, { status: 'Queued' }).exec();
  } catch (e) {
    process.stdout.write(`\n⚠️ enqueueFileProcessing failed: ${e}\n`);
  }
}

export function startWorker(pollIntervalMs = 5000) {
  if (workerRunning) return;
  workerRunning = true;

  process.stdout.write(`\n🛠️  Background worker started (poll ${pollIntervalMs}ms)\n`);

  setInterval(async () => {
    try {
      const file = await FileModel.findOne({ status: { $in: ['Queued', 'Uploaded'] } }).sort({ uploadedAt: 1 }).exec();
      if (!file) return;

      process.stdout.write(`\n🔎 Processing file ${file.id} (${file.name})\n`);
      file.status = 'Processing';
      await file.save();

      // Mock processing: OCR / embeddings / metadata extraction
      await new Promise((r) => setTimeout(r, 1200));

      file.status = 'Processed';
      await file.save();

      process.stdout.write(`\n✅ Processed file ${file.id}\n`);
    } catch (e) {
      process.stdout.write(`\n⚠️ Worker loop error: ${e}\n`);
    }
  }, pollIntervalMs);
}
