# cleanup.sh
echo "Starting cleanup of Prometheus Kubernetes setup..."

echo "Deleting prometheus deployment..."
kubectl delete -f prometheus-deployment.yaml

echo "Deleting prometheus service..."
kubectl delete -f prometheus-service.yaml

echo "Deleting prometheus config map..."
kubectl delete -f prometheus-configmap.yaml

echo "Deleting prometheus cluster role and role binding..."
kubectl delete -f prometheus-role.yaml

echo "Deleting monitoring namespace..."
kubectl delete namespace monitoring

echo "Cleanup of Prometheus Kubernetes setup completed."
