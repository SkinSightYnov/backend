# promtail_cleanup.sh
echo "Starting cleanup of Promtail Kubernetes setup..."

echo "Deleting Promtail deployment..."
kubectl delete -f promtail-deployment.yaml

echo "Deleting Promtail config map..."
kubectl delete -f promtail-configmap.yaml

echo "Cleanup of Promtail Kubernetes setup completed."
