<script lang="ts">
	import {browser} from '$app/environment';
	import {goto} from '$app/navigation';
	import {user} from '$lib/firebase';

	if (!$user && browser) goto('/');
</script>

<slot><!-- optional fallback --></slot>
