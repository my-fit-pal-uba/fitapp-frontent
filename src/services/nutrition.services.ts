
export async function getDishes() {
    const response = await fetch('http://localhost:8080/nutrition/get_dishes');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (!data.response) {
        return []
    }
    return data.message;
}