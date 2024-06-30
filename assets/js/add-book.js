function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

document
  .getElementById("category-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Get the token from the cookie
    const token = getCookie("token"); // Assuming the token is stored in a cookie named 'token'

    // Check if token exists
    if (!token) {
      alert("No token found. Please log in first.");
      return;
    }

    console.log(token);

    // Get form data
    const title = document.getElementById("title").value;
    const id_genre = document.getElementById("id_genre").value;

    // Send the POST request
    try {
      const response = await fetch(
        "https://fly-web-services.vercel.app/books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, id_genre }),
        }
      );

      const result = await response.json();
      console.log(response);

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Add Successful",
          text: result.message,
          showConfirmButton: true,
        }).then(() => {
          window.location.href = "./book.html"; // Ubah ke halaman yang diinginkan
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Add Failed',
          text: result.message,
          showConfirmButton: true,
      }).then(() => {
          // Redirect to another page after login
          window.location.href = './book.html'; // Ubah ke halaman yang diinginkan
      });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the book.");
    }
  });
