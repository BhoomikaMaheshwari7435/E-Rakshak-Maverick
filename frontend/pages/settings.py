import streamlit as st
from utils.translations import TEXT

if "language" not in st.session_state:
    st.session_state.language = "en"

t = TEXT[st.session_state.language]

# ---------------- Back Button ----------------
col1, col2 = st.columns([1,5])

with col1:
    if st.button("⬅ Home"):
        st.switch_page("app.py")

st.title("⚙️ " + t["settings"])

st.divider()

languages = {
    "English": "en",
    "हिन्दी": "hi",
    "ગુજરાતી": "gu"
}

current = next(
    key for key, value in languages.items()
    if value == st.session_state.language
)

selected = st.radio(
    t["language"],
    list(languages.keys()),
    index=list(languages.keys()).index(current)
)

if languages[selected] != st.session_state.language:
    st.session_state.language = languages[selected]
    st.rerun()

st.toggle(t["voice"])

st.divider()

st.subheader(t["about"])

st.write(t["about_text"])

st.divider()

st.caption(t["footer1"])
st.caption(t["footer2"])
st.caption(t["footer3"])