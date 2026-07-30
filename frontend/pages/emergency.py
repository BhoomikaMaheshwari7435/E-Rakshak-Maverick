import streamlit as st
from utils.translations import TEXT

# ---------------- Language ----------------
if "language" not in st.session_state:
    st.session_state.language = "en"

t = TEXT[st.session_state.language]

# ---------------- Back Button ----------------
col1, col2 = st.columns([1,5])

with col1:
    if st.button(t["home"]):
        st.switch_page("app.py")

st.title("🚨 " + t["emergency"])

st.divider()

st.subheader("🚓 " + t["police"])
st.success("100")

st.divider()

st.subheader("💻 " + t["cyber"])
st.success("1930")

st.divider()

st.subheader("📞 " + t["national_emergency"])
st.success("112")

st.divider()

st.caption(t["footer1"])
st.caption(t["footer2"])
st.caption(t["footer3"])