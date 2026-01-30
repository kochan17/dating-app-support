---
description: アップロードされた参考動画（MP4）を分析・整理するワークフロー
---

// turbo-all

1. ディレクトリの作成
   `admin-page/references/ref-XX-name` の形式で新しいディレクトリを作成します。

2. 音声の抽出 (FFmpeg)
   ```bash
   ffmpeg -i "input.mp4" -q:a 0 -map a "admin-page/references/ref-XX-name/audio.mp3"
   ```

3. 文字起こしの実行 (Python + Whisper)
   `admin-page/references/transcribe.py` (またはプロジェクトルートのもの) を使用して、抽出した `audio.mp3` を文字起こしします。

4. MDファイルの保存
   文字起こし結果を `admin-page/references/ref-XX-name/transcription.md` に保存します。

5. ファイルの移動
   元のMP4ファイルをディレクトリ内に移動します。

6. 実装計画への反映
   文字起こし内容を元に、Remotionの構成やエディタの機能を調整します。
