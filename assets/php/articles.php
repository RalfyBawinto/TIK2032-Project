<?php
header("Content-Type: text/html; charset=UTF-8");
require_once 'config.php';

$sql = "SELECT title, image, content, url FROM articles ORDER BY id DESC";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<article>
            <h3>" . htmlspecialchars($row["title"]) . "</h3>
            <img src='assets/img/articles/" . htmlspecialchars($row["image"]) . "' loading='lazy' alt='" . htmlspecialchars($row["title"]) . "' />
            <p>" . htmlspecialchars($row["content"]) . "<br />
            <a href='" . htmlspecialchars($row["url"]) . "' target='_blank'>Baca selengkapnya</a></p>
        </article>";
    }
} else {
    echo "<p>Tidak ada artikel dinamis.</p>";
}

$conn->close();
?>
