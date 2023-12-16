<template>
	<span>{{ linkText }}</span>
</template>

<script>
export default {
	props: {
		linkText: String
	}
}
</script>

<style scoped>
	span {
		cursor: pointer;
		margin: 0.5em;
	}
	span:hover {
		opacity: 0.6;
	}
</style>