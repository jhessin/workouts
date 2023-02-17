<script lang="ts">
	import {goto} from '$app/navigation';
	import {user} from '$lib/firebase';

	if (!$user) goto('/');
</script>

<slot><!-- optional fallback --></slot>
