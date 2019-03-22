import { base64ToBlob } from "@/lib/api-service";

describe("base64ToBlob関数", () => {
  it("blobにタイプが設定されている", async () => {
    const blob = base64ToBlob(sampleBase64);
    expect(blob.type).toBeTruthy();
  });
});

//google.comのスクリーンショット
const sampleBase64 =
  "data:image/jpeg;base64,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";
