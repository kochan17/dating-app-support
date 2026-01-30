import whisper
import os
import sys

def transcribe_audio(file_path, output_md, output_txt):
    print(f"Loading model and transcribing {file_path}...")
    model = whisper.load_model("base")
    result = model.transcribe(file_path)
    text = result["text"]
    
    with open(output_txt, "w", encoding="utf-8") as f:
        f.write(text)
    
    with open(output_md, "w", encoding="utf-8") as f:
        f.write(f"# 文字起こし結果\n\n{text}\n")
    
    print(f"Transcription saved to {output_md} and {output_txt}")
    return text

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python transcribe_v2.py <audio_path> <output_md> <output_txt>")
        sys.exit(1)
        
    audio_path = sys.argv[1]
    output_md = sys.argv[2]
    output_txt = sys.argv[3]
    
    if os.path.exists(audio_path):
        transcribe_audio(audio_path, output_md, output_txt)
    else:
        print(f"Error: {audio_path} not found.")
