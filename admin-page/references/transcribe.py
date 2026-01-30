import whisper
import os

def transcribe_audio(file_path):
    print(f"Loading model and transcribing {file_path}...")
    model = whisper.load_model("base")
    result = model.transcribe(file_path)
    return result["text"]

if __name__ == "__main__":
    audio_file = "reference_audio.mp3"
    if os.path.exists(audio_file):
        transcription = transcribe_audio(audio_file)
        with open("transcription.txt", "w", encoding="utf-8") as f:
            f.write(transcription)
        print("Transcription saved to transcription.txt")
        print("\nTranscription Content:")
        print(transcription)
    else:
        print(f"Error: {audio_file} not found.")
