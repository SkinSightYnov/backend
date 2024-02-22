# nest_cleanup.sh
echo "Starting cleanup of Nest JS Kubernetes setup..."

echo "Deleting service..."
kubectl delete -f nest-service.yaml

echo "Deleting deployment..."
kubectl delete -f nest-deployment.yaml

echo "Deleting ConfigMap..."
kubectl delete -f nest-configmap.yaml

echo "Deleting namespace api..."
kubectl delete namespace api

echo "Cleanup of Nest JS Kubernetes setup completed."
